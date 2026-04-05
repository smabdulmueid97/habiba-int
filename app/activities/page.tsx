import fs from 'fs';
import path from 'path';
import ActivitiesClient from './ActivitiesClient';
import accomplishments from '../../public/Database/results-activities.json';

function shuffleArray(array: any[]) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function Activities() {
  let imageFiles: string[] = [];
  try {
    const picturesDirectory = path.join(process.cwd(), 'public/Pictures');
    const files = fs.readdirSync(picturesDirectory);
    imageFiles = files
      .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
      .map(file => `/Pictures/${file}`);
    imageFiles = shuffleArray(imageFiles);
  } catch (error) {
    console.error("Directory read error:", error);
  }

  return <ActivitiesClient imageFiles={imageFiles} accomplishments={accomplishments} />;
}
