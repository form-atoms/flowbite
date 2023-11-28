import { PropsWithChildren } from "react";
import { type RenderProp } from "react-render-prop-type";

export type OptionRenderProp = RenderProp<PropsWithChildren, "Option">;

export const Option = (props: PropsWithChildren) => (
  <div className="flex items-center gap-2" {...props} />
);
