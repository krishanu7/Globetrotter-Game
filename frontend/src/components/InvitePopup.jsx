import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const InvitePopup = () => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const handleShare = () => {
    const inviteLink = `http://${window.location.hostname}/?inviter=${user.id}`;
    const message = `Join me on Globetrotter Challenge! My score: Check it out! ${inviteLink}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700">Challenge a Friend</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite a Friend</DialogTitle>
        </DialogHeader>
        <p>Share this link via WhatsApp to challenge your friends!</p>
        <Button onClick={handleShare}>Share via WhatsApp</Button>
      </DialogContent>
    </Dialog>
  );
};

export default InvitePopup;
