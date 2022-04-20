import { MouseEvent } from "react";

export const checkModalCoordinates = (
  modal: any,
  clickTarget: MouseEvent<HTMLButtonElement | HTMLDivElement>
): boolean => {
  const modalCoo = modal.current.getBoundingClientRect();
  const modalTopCoo = modalCoo.top;
  const modalRightCoo = modalCoo.right;
  const modalBottomCoo = modalCoo.bottom;
  const modalLeftCoo = modalCoo.left;

  if (
    clickTarget.pageX < modalLeftCoo ||
    clickTarget.pageX > modalRightCoo ||
    clickTarget.pageY < modalTopCoo ||
    clickTarget.pageY > modalBottomCoo
  ) {
    return true;
  } else return false;
};
