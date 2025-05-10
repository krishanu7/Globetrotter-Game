import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ClueCard = ({ clues }) => {
  return (
    <Card className="bg-gradient-to-br from-blue-100 to-purple-100 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-blue-800">Clues</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc list-inside space-y-2">
          {clues?.map((clue, index) => (
            <li key={index} className="text-gray-700">{clue}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default ClueCard;