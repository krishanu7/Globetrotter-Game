import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ClueCard from '../components/ClueCard';
import Confetti from '../components/Confetti';
import SadFace from '../components/SadFace';
import InvitePopup from '../components/InvitePopup';
import useApi from '../hooks/useApi';

const GamePage = () => {
  const [gameData, setGameData] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [result, setResult] = useState(null);
  const [scores, setScores] = useState({ total_score: 0, correct_answers: 0, incorrect_answers: 0, total_attempts: 0 });
  const [invitee, setInvitee] = useState(null);
  const [searchParams] = useSearchParams();
  const api = useApi();

  useEffect(() => {
    fetchGameData();
    fetchScores();
    const inviterId = searchParams.get('inviter');
    if (inviterId) {
      fetchInviteeScore(inviterId);
    }
  }, [searchParams]);

  const fetchGameData = async () => {
    try {
      const data = await api.getGameData();
      setGameData(data);
      setSelectedOption(null);
      setResult(null);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchScores = async () => {
    try {
      const data = await api.getScores();
      setScores(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchInviteeScore = async (userId) => {
    try {
      const data = await api.getInviteeScore(userId);
      setInvitee(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAnswer = async () => {
    const previousScores = { ...scores };

    try {
      const data = await api.checkAnswer({
        destinationId: gameData.destinationId,
        selectedId: selectedOption,
      });
      setResult(data);
      
      const updatedScores = {
        total_attempts: previousScores.total_attempts + 1,
        correct_answers: previousScores.correct_answers + (data.isCorrect ? 1 : 0),
        incorrect_answers: previousScores.incorrect_answers + (data.isCorrect ? 0 : 1),
        total_score: previousScores.total_score + (data.isCorrect ? 1 : 0),
      };
      setScores(updatedScores);
      fetchScores();

      console.log(scores);
    } catch (error) {
      console.error(error);
      setScores(previousScores);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto grid grid-cols-3 gap-4">
        {/* Game Section */}
        <div className="col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Globetrotter Challenge</CardTitle>
            </CardHeader>
            <CardContent>
              {gameData && (
                <>
                  <ClueCard clues={gameData?.clues} />
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {gameData?.options?.map((option) => (
                      <Button
                        key={option.id}
                        variant={selectedOption === option.id ? 'default' : 'outline'}
                        onClick={() => setSelectedOption(option.id)}
                        className="w-full"
                      >
                        {option.name}
                      </Button>
                    ))}
                  </div>
                  <Button
                    onClick={handleAnswer}
                    disabled={!selectedOption}
                    className="mt-4 w-full"
                  >
                    Submit Answer
                  </Button>
                  {result && (
                    <div className="mt-4">
                      <Confetti trigger={result.isCorrect} />
                      <SadFace trigger={!result.isCorrect} />
                      <p className="text-center text-lg">
                        {result.isCorrect ? 'Correct!' : 'Incorrect!'}
                      </p>
                      <p className="text-center">Fun Fact 😂: {result.funFact}</p>
                      <Button
                        onClick={fetchGameData}
                        className="mt-4 w-full"
                      >
                        Next Challenge
                      </Button>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
          <InvitePopup />
        </div>
        {/* Score Section */}
        <Card className={"h-50"}>
          <CardHeader>
            <CardTitle>Your Score</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Total Score: {scores?.score?.total_score}</p>
            <p>Correct Answers: {scores?.score?.correct_answers}</p>
            <p>Incorrect Answers: {scores?.score?.incorrect_answers}</p>
            <p>Total Attempts: {scores?.score?.total_attempts}</p>
            {invitee && (
              <div className="mt-4">
                <p>Invited by: {invitee.username}</p>
                <p>Their Correct: {invitee.scores.correct_answers}</p>
                <p>Their Incorrect: {invitee.scores.incorrect_answers}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GamePage;
