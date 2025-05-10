import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const SadFace = ({ trigger }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (trigger) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  if (!show) return null;

  return (
    <motion.div
      className="text-6xl text-center"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      😢
    </motion.div>
  );
};

export default SadFace;