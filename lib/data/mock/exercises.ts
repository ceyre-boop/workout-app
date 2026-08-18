import type { Exercise } from '@/lib/types';

export const mockExercises: Exercise[] = [
  {
    id: 'ex-001', slug: 'barbell-back-squat', name: 'Barbell Back Squat', primaryMuscle: 'Quadriceps', equipment: 'Barbell', videoUrl: '/videos/placeholder.mp4',
    cues: ['Brace before you descend', 'Keep the bar over midfoot', 'Drive through the heel'], commonMistakes: ['Knees collapse inward', 'Chest drops out of the bottom'], substitutions: ['front-squat', 'goblet-squat'],
  },
  {
    id: 'ex-002', slug: 'front-squat', name: 'Front Squat', primaryMuscle: 'Quadriceps', equipment: 'Barbell', videoUrl: '/videos/placeholder.mp4',
    cues: ['Lift the elbows high', 'Stay tall through the torso', 'Push the floor away'], commonMistakes: ['Elbows fall during the ascent', 'Heels lift off the floor'], substitutions: ['barbell-back-squat', 'goblet-squat'],
  },
  {
    id: 'ex-003', slug: 'conventional-deadlift', name: 'Conventional Deadlift', primaryMuscle: 'Posterior chain', equipment: 'Barbell', videoUrl: '/videos/placeholder.mp4',
    cues: ['Set the lats before you pull', 'Push the floor away', 'Lock out with the glutes'], commonMistakes: ['Bar drifts from the shins', 'Hips shoot up before the bar'], substitutions: ['romanian-deadlift', 'hip-thrust'],
  },
  {
    id: 'ex-004', slug: 'romanian-deadlift', name: 'Romanian Deadlift', primaryMuscle: 'Hamstrings', equipment: 'Barbell', videoUrl: '/videos/placeholder.mp4',
    cues: ['Push the hips back', 'Keep the bar close', 'Stop when hamstrings tighten'], commonMistakes: ['Squatting the weight down', 'Rounding through the lower back'], substitutions: ['hip-thrust', 'kettlebell-swing'],
  },
  {
    id: 'ex-005', slug: 'barbell-bench-press', name: 'Barbell Bench Press', primaryMuscle: 'Chest', equipment: 'Barbell', videoUrl: '/videos/placeholder.mp4',
    cues: ['Set the shoulder blades', 'Press the feet into the floor', 'Lower to the lower chest'], commonMistakes: ['Elbows flare straight out', 'Bar bounces off the chest'], substitutions: ['push-up', 'dumbbell-shoulder-press'],
  },
  {
    id: 'ex-006', slug: 'overhead-press', name: 'Overhead Press', primaryMuscle: 'Shoulders', equipment: 'Barbell', videoUrl: '/videos/placeholder.mp4',
    cues: ['Squeeze the glutes', 'Keep ribs stacked', 'Finish with biceps by ears'], commonMistakes: ['Leaning back to clear the bar', 'Pressing in front of the body'], substitutions: ['dumbbell-shoulder-press', 'push-up'],
  },
  {
    id: 'ex-007', slug: 'barbell-row', name: 'Barbell Row', primaryMuscle: 'Upper back', equipment: 'Barbell', videoUrl: '/videos/placeholder.mp4',
    cues: ['Hinge and hold the torso still', 'Pull toward the lower ribs', 'Pause at the top'], commonMistakes: ['Standing up with each rep', 'Jerking the bar from the floor'], substitutions: ['pull-up', 'chin-up'],
  },
  {
    id: 'ex-008', slug: 'pull-up', name: 'Pull-Up', primaryMuscle: 'Lats', equipment: 'Pull-up bar', videoUrl: '/videos/placeholder.mp4',
    cues: ['Start from a dead hang', 'Drive elbows toward ribs', 'Keep the legs quiet'], commonMistakes: ['Kipping to start each rep', 'Stopping short of the bottom'], substitutions: ['chin-up', 'barbell-row'],
  },
  {
    id: 'ex-009', slug: 'chin-up', name: 'Chin-Up', primaryMuscle: 'Lats', equipment: 'Pull-up bar', videoUrl: '/videos/placeholder.mp4',
    cues: ['Use a shoulder-width grip', 'Pull chest toward the bar', 'Lower under control'], commonMistakes: ['Shrugging into the shoulders', 'Swinging the legs'], substitutions: ['pull-up', 'barbell-row'],
  },
  {
    id: 'ex-010', slug: 'push-up', name: 'Push-Up', primaryMuscle: 'Chest', equipment: 'Bodyweight', videoUrl: '/videos/placeholder.mp4',
    cues: ['Keep a straight line', 'Screw hands into the floor', 'Touch the chest between hands'], commonMistakes: ['Hips sag below the shoulders', 'Elbows flare too wide'], substitutions: ['barbell-bench-press', 'dumbbell-shoulder-press'],
  },
  {
    id: 'ex-011', slug: 'dumbbell-lunge', name: 'Dumbbell Lunge', primaryMuscle: 'Quadriceps', equipment: 'Dumbbells', videoUrl: '/videos/placeholder.mp4',
    cues: ['Step far enough to stack the shin', 'Drop the back knee straight down', 'Drive through the front foot'], commonMistakes: ['Front knee caves inward', 'Taking steps that are too short'], substitutions: ['bulgarian-split-squat', 'sandbag-lunge'],
  },
  {
    id: 'ex-012', slug: 'bulgarian-split-squat', name: 'Bulgarian Split Squat', primaryMuscle: 'Quadriceps', equipment: 'Dumbbells', videoUrl: '/videos/placeholder.mp4',
    cues: ['Set the front foot first', 'Lower straight down', 'Keep pressure through the whole foot'], commonMistakes: ['Pushing off the rear foot', 'Losing balance by rushing'], substitutions: ['dumbbell-lunge', 'goblet-squat'],
  },
  {
    id: 'ex-013', slug: 'hip-thrust', name: 'Hip Thrust', primaryMuscle: 'Glutes', equipment: 'Barbell', videoUrl: '/videos/placeholder.mp4',
    cues: ['Tuck the ribs down', 'Drive through the heels', 'Squeeze at full lockout'], commonMistakes: ['Overarching the lower back', 'Feet set too far forward'], substitutions: ['romanian-deadlift', 'kettlebell-swing'],
  },
  {
    id: 'ex-014', slug: 'kettlebell-swing', name: 'Kettlebell Swing', primaryMuscle: 'Posterior chain', equipment: 'Kettlebell', videoUrl: '/videos/placeholder.mp4',
    cues: ['Hinge instead of squat', 'Snap the hips forward', 'Let the bell float'], commonMistakes: ['Lifting with the arms', 'Rounding at the bottom'], substitutions: ['romanian-deadlift', 'hip-thrust'],
  },
  {
    id: 'ex-015', slug: 'goblet-squat', name: 'Goblet Squat', primaryMuscle: 'Quadriceps', equipment: 'Dumbbell', videoUrl: '/videos/placeholder.mp4',
    cues: ['Hold the weight close', 'Sit between the hips', 'Keep the chest tall'], commonMistakes: ['Letting the weight drift forward', 'Knees fold inward'], substitutions: ['front-squat', 'barbell-back-squat'],
  },
  {
    id: 'ex-016', slug: 'farmers-carry', name: "Farmer's Carry", primaryMuscle: 'Grip', equipment: 'Dumbbells', videoUrl: '/videos/placeholder.mp4',
    cues: ['Stand tall under the load', 'Take short controlled steps', 'Keep shoulders away from ears'], commonMistakes: ['Leaning to one side', 'Walking with loose posture'], substitutions: ['sled-pull', 'sandbag-lunge'],
  },
  {
    id: 'ex-017', slug: 'wall-ball', name: 'Wall Ball', primaryMuscle: 'Full body', equipment: 'Medicine ball', videoUrl: '/videos/placeholder.mp4',
    cues: ['Catch with soft knees', 'Use the hips to drive', 'Track the target'], commonMistakes: ['Throwing with only the arms', 'Catching with straight legs'], substitutions: ['goblet-squat', 'dumbbell-shoulder-press'],
  },
  {
    id: 'ex-018', slug: 'burpee', name: 'Burpee', primaryMuscle: 'Full body', equipment: 'Bodyweight', videoUrl: '/videos/placeholder.mp4',
    cues: ['Place hands under shoulders', 'Step or jump feet back', 'Stand tall before the next rep'], commonMistakes: ['Hips sag in the plank', 'Skipping full extension at the top'], substitutions: ['push-up', 'box-jump'],
  },
  {
    id: 'ex-019', slug: 'box-jump', name: 'Box Jump', primaryMuscle: 'Quadriceps', equipment: 'Plyometric box', videoUrl: '/videos/placeholder.mp4',
    cues: ['Load the hips back', 'Swing the arms through', 'Land quietly with both feet'], commonMistakes: ['Jumping from tired knees', 'Landing stiff-legged'], substitutions: ['goblet-squat', 'burpee'],
  },
  {
    id: 'ex-020', slug: 'plank', name: 'Plank', primaryMuscle: 'Core', equipment: 'Bodyweight', videoUrl: '/videos/placeholder.mp4',
    cues: ['Squeeze the glutes', 'Pull elbows toward toes', 'Keep ribs down'], commonMistakes: ['Hips sag toward the floor', 'Holding the breath'], substitutions: ['hanging-knee-raise', 'push-up'],
  },
  {
    id: 'ex-021', slug: 'hanging-knee-raise', name: 'Hanging Knee Raise', primaryMuscle: 'Core', equipment: 'Pull-up bar', videoUrl: '/videos/placeholder.mp4',
    cues: ['Start from a dead hang', 'Curl the pelvis under', 'Lower without swinging'], commonMistakes: ['Using momentum from the legs', 'Shrugging into the shoulders'], substitutions: ['plank', 'push-up'],
  },
  {
    id: 'ex-022', slug: 'rowing-erg-intervals', name: 'Rowing Erg Intervals', primaryMuscle: 'Cardiovascular', equipment: 'Rowing erg', videoUrl: '/videos/placeholder.mp4',
    cues: ['Push with the legs first', 'Finish with the arms', 'Recover hands away first'], commonMistakes: ['Pulling early with the arms', 'Rushing the slide forward'], substitutions: ['ski-erg', 'running-intervals'],
  },
  {
    id: 'ex-023', slug: 'ski-erg', name: 'Ski Erg', primaryMuscle: 'Cardiovascular', equipment: 'Ski erg', videoUrl: '/videos/placeholder.mp4',
    cues: ['Reach tall at the catch', 'Drive the handles past the hips', 'Use a firm hip hinge'], commonMistakes: ['Pulling only with the arms', 'Standing too upright'], substitutions: ['rowing-erg-intervals', 'running-intervals'],
  },
  {
    id: 'ex-024', slug: 'sled-push', name: 'Sled Push', primaryMuscle: 'Full body', equipment: 'Sled', videoUrl: '/videos/placeholder.mp4',
    cues: ['Lock the arms into the handles', 'Keep hips low', 'Drive steady short steps'], commonMistakes: ['Standing too tall', 'Taking long reaching steps'], substitutions: ['sled-pull', 'farmers-carry'],
  },
  {
    id: 'ex-025', slug: 'sled-pull', name: 'Sled Pull', primaryMuscle: 'Posterior chain', equipment: 'Sled', videoUrl: '/videos/placeholder.mp4',
    cues: ['Sit back into the straps', 'Pull hand over hand', 'Keep the feet moving'], commonMistakes: ['Rounding the back', 'Stopping between pulls'], substitutions: ['sled-push', 'farmers-carry'],
  },
  {
    id: 'ex-026', slug: 'running-intervals', name: 'Running Intervals', primaryMuscle: 'Cardiovascular', equipment: 'None', videoUrl: '/videos/placeholder.mp4',
    cues: ['Start controlled', 'Keep a quick cadence', 'Jog the recovery'], commonMistakes: ['Sprinting the first repeat', 'Braking hard between intervals'], substitutions: ['rowing-erg-intervals', 'ski-erg'],
  },
  {
    id: 'ex-027', slug: 'tempo-run', name: 'Tempo Run', primaryMuscle: 'Cardiovascular', equipment: 'None', videoUrl: '/videos/placeholder.mp4',
    cues: ['Set a repeatable pace', 'Keep shoulders relaxed', 'Finish with the same rhythm'], commonMistakes: ['Starting above target pace', 'Letting cadence slow late'], substitutions: ['easy-run', 'running-intervals'],
  },
  {
    id: 'ex-028', slug: 'easy-run', name: 'Easy Run', primaryMuscle: 'Cardiovascular', equipment: 'None', videoUrl: '/videos/placeholder.mp4',
    cues: ['Keep the effort conversational', 'Land under the hips', 'Relax the hands'], commonMistakes: ['Turning recovery into a race', 'Overstriding'], substitutions: ['tempo-run', 'running-intervals'],
  },
  {
    id: 'ex-029', slug: 'sandbag-lunge', name: 'Sandbag Lunge', primaryMuscle: 'Quadriceps', equipment: 'Sandbag', videoUrl: '/videos/placeholder.mp4',
    cues: ['Set the bag high on the body', 'Keep the torso stacked', 'Drive from the front leg'], commonMistakes: ['Letting the bag pull the torso forward', 'Losing knee control'], substitutions: ['dumbbell-lunge', 'bulgarian-split-squat'],
  },
  {
    id: 'ex-030', slug: 'dumbbell-shoulder-press', name: 'Dumbbell Shoulder Press', primaryMuscle: 'Shoulders', equipment: 'Dumbbells', videoUrl: '/videos/placeholder.mp4',
    cues: ['Keep wrists over elbows', 'Brace before each press', 'Lower with control'], commonMistakes: ['Flaring the ribs', 'Pressing unevenly'], substitutions: ['overhead-press', 'push-up'],
  },
];
