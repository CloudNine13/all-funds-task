import { useEffect, useState, type ImgHTMLAttributes } from 'react';
import { Skeleton } from '@mui/material';
import { ImageStatus, type ContentVariant } from '@lib/types';
import { StyledImage } from './ImageWithFallback.style';
import {
  IMAGE_SIZE,
  ALT_IMAGE_TEXT,
  SKELETON_VARIANT,
  IMAGE_LOADING,
  IMAGE_ERROR_SRC
} from './constants';

type ImageProps = {
  type: ContentVariant;
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
    return (
      <Skeleton
        variant={SKELETON_VARIANT}
        width={IMAGE_SIZE.LOGO.width}
        height={IMAGE_SIZE.LOGO.height}
      />
    );

  if (status === ImageStatus.ERROR)
    return <img alt={ALT_IMAGE_TEXT} loading={IMAGE_LOADING} src={IMAGE_ERROR_SRC} />;

  return (
    <StyledImage alt={ALT_IMAGE_TEXT} loading={IMAGE_LOADING} src={src} type={type} {...rest} />
  );
};

export default ImageWithFallback;
