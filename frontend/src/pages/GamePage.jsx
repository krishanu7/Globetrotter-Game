import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ClueCard from '../components/ClueCard';
import Confetti from '../components/Confetti';
import SadFace from '../components/SadFace';
import InvitePopup from '../components/InvitePopup';
import useApi from '../hooks/useApi';
import ScoreSection from '../components/ScoreSection';

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
      setInvitee({
        username: data?.score?.username,
        correct_answers: data?.score?.correct_answers,
        incorrect_answers: data?.score?.incorrect_answers,
      });
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
    } catch (error) {
      console.error(error);
      setScores(previousScores);
    }
  };

  const handleInvite = () => {
    const userId = scores?.userId;
    const inviteLink = `http://${window.location.hostname}/game?inviter=${userId}`;
    alert(`I just played Globetrotter! Can you beat my score?\nPlay here: ${inviteLink}`);
  };


  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 p-4 ">
      <div className="max-w-7xl mx-auto mt-10 grid grid-cols-3 gap-4">
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
          <InvitePopup handleInvite={handleInvite} />
        </div>
        {/* Score Section */}
        <ScoreSection scores={scores} invitee={invitee} />
      </div>
    </div>
  );
};

export default GamePage;
