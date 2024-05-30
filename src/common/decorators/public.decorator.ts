import { SetMetadata } from "@nestjs/common";


export const IS_PUBLIC_KEY = "Is_Public";

export const Public = () => SetMetadata('Is_Public', true)
