import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ScoreSection = ({ scores, invitee }) => {
  const hasInvitee = Boolean(invitee);

  return (
    <div className="space-y-4">
      {/* Main Score Card */}
      <Card className="h-50">
        <CardHeader>
          <CardTitle>Your Score</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Total Score: {scores?.score?.total_score}</p>
          <p>Correct Answers: {scores?.score?.correct_answers}</p>
          <p>Incorrect Answers: {scores?.score?.incorrect_answers}</p>
          <p>Total Attempts: {scores?.score?.total_attempts}</p>
        </CardContent>
      </Card>

      {/* Conditionally Rendered Invitee Card */}
      {hasInvitee && (
        <Card className="h-50">
          <CardHeader>
            <CardTitle>Invited by {invitee.username}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Correct Answers: {invitee.correct_answers}</p>
            <p>Incorrect Answers: {invitee.incorrect_answers}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ScoreSection;
