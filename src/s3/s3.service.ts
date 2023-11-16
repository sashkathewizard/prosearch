import {Injectable, Logger} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {PutObjectCommand, PutObjectCommandInput, PutObjectCommandOutput, S3Client} from "@aws-sdk/client-s3";
import * as process from "process";

@Injectable()
export class S3Service {
    private logger = new Logger(S3Client.name)
    private region: string;
    private s3: S3Client;

    constructor(private configService: ConfigService){
        this.region = this.configService.get<string>(process.env.S3_REGION) || 'eu-west-2'
        this.s3 = new S3Client({
            region: this.region
        });
    }
    async uploadFile(file: Express.Multer.File, key: string){
        const bucket = this.configService.get<string>(process.env.S3_BUCKET) || 'default-bucket'
        const input: PutObjectCommandInput = {
            Body: file.buffer,
            Bucket: bucket,
            Key: key,
            ContentType: file.mimetype,
            ACL: 'public-read'
        };
        try {
            const responce: PutObjectCommandOutput = await this.s3.send(
                new PutObjectCommand(input),
            );
            if(responce.$metadata.httpStatusCode === 200){
                return `https://${bucket}.s3.${this.region}.amazonaws.com/${key}`;
            }
        }catch (e){
            this.logger.error('Cannot save file inside s3');
            throw e;
        }
    }
}

