import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { UserDocument } from "../models";

const getCurrentUserByCtx = (ctx: ExecutionContext): UserDocument => {  
  return ctx.switchToHttp().getRequest().user;
}

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => getCurrentUserByCtx(ctx)
)