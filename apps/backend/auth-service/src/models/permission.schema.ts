import { Prop } from '@nestjs/mongoose';

export enum ResourceType {
  MENU = 'MENU',
  PAGE = 'PAGE',
  BUTTON = 'BUTTON',
}
export class Permission {
  @Prop({
    required: true,
    unique: true,
    type: String,
  })
  name: string;

  @Prop({
    required: true,
    type: String,
  })
  desc: string;

  @Prop({
    required: true,
    enum: Object.values(ResourceType),
  })
  type: string;
}
