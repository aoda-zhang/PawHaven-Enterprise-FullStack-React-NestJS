import { Body, Controller, Post, Req } from '@nestjs/common'
import { EmailService } from './email.service'
import EmailPayloadDTO from '@shared/DTO/Document/send-email.DTO'

@Controller('email')
export class EmailController {
    constructor(private readonly emailService: EmailService) {}

    @Post('/send')
    sendEmail(@Req() req, @Body() emailInfo: EmailPayloadDTO) {
        const userID = req?.user?.userID
        return this.emailService.sendMail(userID, emailInfo)
    }

    @Post('/preview')
    previewEmail(@Body() emailInfo: EmailPayloadDTO) {
        return this.emailService.getEmailHtml({
            template: emailInfo?.template,
            payload: emailInfo?.payload,
            locale: emailInfo?.locale ?? 'en'
        })
    }
}
