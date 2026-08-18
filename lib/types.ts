/** A user profile and local display preferences. */
export interface Profile {
  id: string;
  displayName: string;
  avatarUrl: string;
  units: 'metric' | 'imperial';
  themePref: 'light' | 'dark' | 'system';
  tz: string;
}

/** A structured training program available to a user. */
export interface Program {
  id: string;
  slug: string;
  title: string;
  category: 'strength' | 'running' | 'hybrid' | 'race-prep';
  durationWeeks: number;
  coverImage: string;
  description: string;
  isPublished: boolean;
  sortOrder: number;
}

/** A numbered week within a training program. */
export interface ProgramWeek {
  id: string;
  programId: string;
  weekNumber: number;
  title: string;
  notes: string;
}

/** A scheduled workout in a program week. */
export interface Workout {
  id: string;
  programWeekId: string;
  dayNumber: number;
  title: string;
  estMinutes: number;
  coverImage: string;
  description: string;
}

/** A reusable exercise with coaching guidance. */
export interface Exercise {
  id: string;
  slug: string;
  name: string;
  primaryMuscle: string;
  equipment: string;
  videoUrl: string;
  cues: string[];
  commonMistakes: string[];
  substitutions?: string[];
}

/** An exercise prescription within a workout. */
export interface WorkoutExercise {
  id: string;
  workoutId: string;
  exerciseId: string;
  orderIndex: number;
  sets: number;
  repsPrescribed: string;
  restSeconds: number;
  tempo?: string;
  notes?: string;
  supersetGroup?: string;
}

/** A user's participation state for a program. */
export interface Enrollment {
  id: string;
  userId: string;
  programId: string;
  startedAt: string;
  currentWeek: number;
  status: 'active' | 'completed' | 'paused';
}

/** A single attempt to complete a workout. */
export interface Session {
  id: string;
  userId: string;
  workoutId: string;
  clientSessionUuid: string;
  startedAt: string;
  completedAt?: string;
  durationSeconds?: number;
  status: 'in_progress' | 'completed' | 'abandoned';
}

/** A recorded result for one prescribed set. */
export interface SetLog {
  /** Client-generated UUID produced by crypto.randomUUID() at write time for the offline-first write path. */
  id: string;
  sessionId: string;
  workoutExerciseId: string;
  setIndex: number;
  weight?: number;
  reps?: number;
  rpe?: number;
  completedAt: string;
  skipped: boolean;
}

/** A dated body-composition measurement for a user. */
export interface BodyStats {
  /** Client-generated UUID produced by crypto.randomUUID() at write time for the offline-first write path. */
  id: string;
  userId: string;
  recordedAt: string;
  weight: number;
  bodyfatPct?: number;
  measurements?: Record<string, number>;
}

/** The billing state associated with a user account. */
export interface Subscription {
  userId: string;
  stripeCustomerId?: string;
  status: 'active' | 'trialing' | 'canceled' | 'none';
  currentPeriodEnd?: string;
}
