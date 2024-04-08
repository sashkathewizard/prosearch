import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto{
    @ApiProperty()
    readonly email: string;
    @ApiProperty()
    readonly password: string;
    readonly type: string;
}