import { useEffect, useState } from "react";
import { getMiniGame, submitMiniGame } from "../api/minigame_client";
import type { Problem } from "../api/types";

interface MathMiniGameProps {
  onSuccess: () => void;
}

const MathMiniGame = ({ onSuccess }: MathMiniGameProps) => {
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [question, setQuestion] = useState<Problem | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [customerId, setCustomerId] = useState<number | null>(null);

  useEffect(() => {
    const waitForSmile = () =>
      new Promise<void>((resolve) => {
        if ((window as any).SmileUI?.ready && (window as any).Smile) {
          resolve();
        } else {
          document.addEventListener("smile-ui-loaded", () => resolve(), { once: true });
        }
      });

    const initMiniGame = async () => {
      try {
        await waitForSmile();
        await (window as any).SmileUI.ready();

        const customer = await (window as any).SmileUI.customerReady();
        if (!customer) {
          setFeedback("Could not identify customer.");
          return;
        }

        setCustomerId(customer.id);

        const result = await getMiniGame(customer.id);
        if (result.completed) {
          setCompleted(true);
        } else {
          setQuestion(result.question);
        }
      } catch (err) {
        setFeedback("Could not load the mini game.");
      } finally {
        setLoading(false);
      }
    };

    initMiniGame();
  }, []);

  const handleSubmit = async () => {
    if (!question || !customerId) return;

    setSubmitting(true);
    setFeedback("");

    try {
      const result = await submitMiniGame({
        customer_id: customerId,
        answer: Number(userAnswer),
      });

      if (result.success) {
        setCompleted(true);
        setFeedback("✅ Correct! You've earned 50 points.");
        onSuccess(); // refresh the UI component showing customer's points
      } else {
        setFeedback("❌ Incorrect answer.");
      }
    } catch (err) {
      setFeedback("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="text-sm text-gray-500">Loading mini game...</p>;

  if (completed)
    return (
      <p className="text-green-600 text-sm">
        🐒🐒🐒 You've already completed today's mini game. Come back tomorrow! 🐒🐒🐒
      </p>
    );

  if (!question)
    return <p className="text-red-500 text-sm">No mini game available.</p>;

  return (
    <div className="border rounded-lg p-4 bg-yellow-50 shadow-sm space-y-3">
      <h2 className="text-lg font-semibold">Daily Math Mini Game</h2>
      <p className="text-sm text-gray-800">
        What is {question.a.toString()} + {question.b.toString()}?
      </p>
      <div className="flex gap-2 items-center">
        <input
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          className="w-24 px-2 py-1 border rounded text-center"
          disabled={submitting}
        />
        <button
          onClick={handleSubmit}
          disabled={submitting || userAnswer === ""}
          className="px-4 py-1 bg-blue-600 text-white rounded disabled:bg-gray-400"
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </div>
      {feedback && <p className="text-sm text-gray-700">{feedback}</p>}
    </div>
  );
};

export default MathMiniGame;
