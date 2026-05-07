import React, { useState, useEffect, useRef } from 'react'

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  priority?: boolean
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className, priority = false }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [shouldLoad, setShouldLoad] = useState(priority)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (priority || shouldLoad) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true)
            observer.disconnect()
          }
        })
      },
      { rootMargin: '200px' }
    )

    if (imageRef.current) {
      observer.observe(imageRef.current)
    }

    return () => observer.disconnect()
  }, [priority, shouldLoad])

  // Simple auto-detect for AVIF/WebP if the files exist in the same path
  const avifSrc = src.replace(/\.(jpg|jpeg|png)$/, '.avif')
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/, '.webp')

  return (
    <div 
      ref={imageRef} 
      className={`relative overflow-hidden bg-white/5 ${className}`}
    >
      {shouldLoad && (
        <picture>
          <source srcSet={avifSrc} type="image/avif" />
          <source srcSet={webpSrc} type="image/webp" />
          <img
            src={src}
            alt={alt}
            decoding="async"
            loading={priority ? 'eager' : 'lazy'}
            onLoad={() => setIsLoaded(true)}
            className={`h-full w-full object-cover transition-opacity duration-1000 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </picture>
      )}
      
      {/* Shimmer effect while loading */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent animate-shimmer" 
             style={{ backgroundSize: '200% 100%' }} />
      )}
    </div>
  )
}

export default LazyImage
