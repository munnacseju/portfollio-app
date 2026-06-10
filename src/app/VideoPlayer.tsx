'use client';

export const VideoPlayer = ({ url }: { url: string }) => {
  if (!url) return null;

  // Function to get embed URL for YouTube
  const getYouTubeEmbedUrl = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
  };

  // Function to get embed URL for Facebook
  const getFacebookEmbedUrl = (url: string) => {
    if (url.includes('facebook.com')) {
      return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=0&width=560`;
    }
    return null;
  };

  const youtubeUrl = getYouTubeEmbedUrl(url);
  const facebookUrl = getFacebookEmbedUrl(url);

  if (youtubeUrl || facebookUrl) {
    return (
      <div className="aspect-video w-full rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900">
        <iframe
          src={youtubeUrl || facebookUrl || ''}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  }

  // Fallback to local video tag if it's a direct file (e.g. from Supabase)
  return (
    <div className="aspect-video w-full rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900">
      <video 
        src={url} 
        controls 
        className="w-full h-full object-cover"
      />
    </div>
  );
};
