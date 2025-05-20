import { AppLayout } from '../components/AppLayout';
import { MovingPictureGameTab } from '../components/MovingPictureGame';

const MovingPicture: React.FC = () => {
  return (
      <AppLayout>
        <MovingPictureGameTab />
      </AppLayout>
    );
  };

export default MovingPicture;
