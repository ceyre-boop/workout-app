import {
  mockPrograms,
  mockProgramWeeks,
  mockWorkouts,
  mockWorkoutExercises,
  mockExercises,
  mockProfile,
  mockEnrollments,
  mockSessions,
  mockSetLogs,
  mockBodyStats,
} from "@/lib/data/mock";
import type {
  Program,
  ProgramWeek,
  Workout,
  Exercise,
  WorkoutExercise,
} from "@/lib/types";

/**
 * Repository seam (ISC-30/31): every screen reads through these functions,
 * never the raw mock arrays directly. Swapping the mock implementation for
 * a Supabase-backed one later means rewriting this file only.
 */

export async function getPrograms(): Promise<Program[]> {
  return [...mockPrograms].sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getProgramBySlug(slug: string): Promise<Program | undefined> {
  return mockPrograms.find((p) => p.slug === slug);
}

export async function getProgramWeeks(programId: string): Promise<ProgramWeek[]> {
  return mockProgramWeeks
    .filter((w) => w.programId === programId)
    .sort((a, b) => a.weekNumber - b.weekNumber);
}

export async function getWorkoutsForWeek(programWeekId: string): Promise<Workout[]> {
  return mockWorkouts
    .filter((w) => w.programWeekId === programWeekId)
    .sort((a, b) => a.dayNumber - b.dayNumber);
}

export async function getWorkout(id: string): Promise<Workout | undefined> {
  return mockWorkouts.find((w) => w.id === id);
}

export async function getProgramForWorkout(workoutId: string): Promise<Program | undefined> {
  const workout = mockWorkouts.find((w) => w.id === workoutId);
  if (!workout) return undefined;
  const week = mockProgramWeeks.find((w) => w.id === workout.programWeekId);
  if (!week) return undefined;
  return mockPrograms.find((p) => p.id === week.programId);
}

export async function getWorkoutExercises(workoutId: string): Promise<WorkoutExercise[]> {
  return mockWorkoutExercises
    .filter((we) => we.workoutId === workoutId)
    .sort((a, b) => a.orderIndex - b.orderIndex);
}

export async function getExercise(id: string): Promise<Exercise | undefined> {
  return mockExercises.find((e) => e.id === id);
}

export async function getExerciseBySlug(slug: string): Promise<Exercise | undefined> {
  return mockExercises.find((e) => e.slug === slug);
}

export async function getProfile() {
  return mockProfile;
}

export async function getEnrollments() {
  return mockEnrollments;
}

export async function getActiveEnrollment() {
  return mockEnrollments.find((e) => e.status === "active");
}

export async function getEnrollmentForProgram(programId: string) {
  return mockEnrollments.find((e) => e.programId === programId);
}

export async function getSessions() {
  return [...mockSessions].sort(
    (a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime(),
  );
}

export async function getSetLogsForSession(sessionId: string) {
  return mockSetLogs.filter((l) => l.sessionId === sessionId);
}

export async function getBodyStats() {
  return [...mockBodyStats].sort(
    (a, b) => new Date(a.recordedAt).getTime() - new Date(b.recordedAt).getTime(),
  );
}

export async function getFirstWorkoutOfProgram(programId: string): Promise<Workout | undefined> {
  const weeks = await getProgramWeeks(programId);
  const firstWeek = weeks[0];
  if (!firstWeek) return undefined;
  const workouts = await getWorkoutsForWeek(firstWeek.id);
  return workouts[0];
}

/** The workout to feature on Home — the active enrollment's next unfinished workout. */
export async function getTodaysWorkout(): Promise<
  { workout: Workout; program: Program } | undefined
> {
  const enrollment = await getActiveEnrollment();
  if (!enrollment) return undefined;
  const program = await getProgramBySlug(
    mockPrograms.find((p) => p.id === enrollment.programId)?.slug ?? "",
  );
  if (!program) return undefined;
  const weeks = await getProgramWeeks(program.id);
  const currentWeek = weeks.find((w) => w.weekNumber === enrollment.currentWeek) ?? weeks[0];
  if (!currentWeek) return undefined;
  const workouts = await getWorkoutsForWeek(currentWeek.id);
  const workout = workouts[0];
  if (!workout) return undefined;
  return { workout, program };
}
