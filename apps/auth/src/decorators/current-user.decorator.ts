import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { UserDocument } from "../user/models/user.schema";

const getCurrentUserByCtx = (ctx: ExecutionContext): UserDocument => {
  return ctx.switchToHttp().getRequest().user;
}

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => getCurrentUserByCtx(ctx)
)