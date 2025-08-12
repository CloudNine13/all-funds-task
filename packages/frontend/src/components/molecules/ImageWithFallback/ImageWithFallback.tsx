import { useEffect, useState, type ImgHTMLAttributes } from 'react';
import { CardMedia, Skeleton } from '@mui/material';
import { ImageVariant, ImageStatus } from '@lib/types';
import {
  ALT_IMAGE_TEXT,
  SKELETON_VARIANT,
  IMAGE_LOADING,
  IMAGE_ERROR_SRC,
  COMPONENT,
  SKELETON_ANIMATION
} from './constants';
import { CenteredErrorImage } from './ImageWithFallback.style';

type ImageProps = {
  type: ImageVariant;
  src: string;
};

const ImageWithFallback = ({
  type,
  src,
  ...rest
}: ImageProps & ImgHTMLAttributes<HTMLImageElement>) => {
  const [status, setStatus] = useState<ImageStatus>(ImageStatus.LOADING);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setStatus(ImageStatus.SUCCESS);
    img.onerror = () => setStatus(ImageStatus.ERROR);
    img.src = src;
  }, [src]);

  if (status === ImageStatus.LOADING)
    return <Skeleton variant={SKELETON_VARIANT} animation={SKELETON_ANIMATION} {...rest} />;

  if (status === ImageStatus.ERROR)
    return (
      <CenteredErrorImage
        alt={ALT_IMAGE_TEXT}
        loading={IMAGE_LOADING}
        src={IMAGE_ERROR_SRC}
        {...rest}
      />
    );

  return type === ImageVariant.LOGO ? (
    <img alt={ALT_IMAGE_TEXT} loading={IMAGE_LOADING} src={src} {...rest} />
  ) : (
    <CardMedia
      component={COMPONENT}
      alt={ALT_IMAGE_TEXT}
      loading={IMAGE_LOADING}
      image={src}
      {...rest}
    />
  );
};

export default ImageWithFallback;
