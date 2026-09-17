// Video tours shown on stay pages. Add one entry per property as new videos are made.
// Files live in public/videos/. Keep web versions small (720x1280, roughly 1.5 Mbps).
export type VideoTour = { src: string; poster: string; ai: boolean; duration: string };

export const videoTours: Record<string, VideoTour> = {
  'coastal-run': {
    src: '/videos/coastal-run-tour.mp4',
    poster: '/videos/coastal-run-tour-poster.webp',
    ai: true, // presenter generated with AI from the listing photos; label it on the page
    duration: '0:56',
  },
};
