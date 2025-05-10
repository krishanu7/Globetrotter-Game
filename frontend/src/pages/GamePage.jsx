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
  const [scores, setScores] = useState({ correct_score: 0, incorrect_score: 0 });
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
  }, []);

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
    try {
      const data = await api.checkAnswer({
        destinationId: gameData.destinationId,
        selectedId: selectedOption,
      });
      setResult(data);
      fetchScores();
    } catch (error) {
      console.error(error);
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
                  <ClueCard clues={gameData.clues} />
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {gameData.options.map((option) => (
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
                      <p className="text-center">Fun Fact: {result.funFact}</p>
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

        <Card>
          <CardHeader>
            <CardTitle>Your Score</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Correct: {scores.correct_score || 0}</p>
            <p>Incorrect: {scores.incorrect_score || 0}</p>
            {invitee && (
              <div className="mt-4">
                <p>Invited by: {invitee.username}</p>
                <p>Their Correct: {invitee.scores.correct_score || 0}</p>
                <p>Their Incorrect: {invitee.scores.incorrect_score || 0}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GamePage;