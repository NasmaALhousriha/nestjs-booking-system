import { Controller, Get, Post, Query , Param, Body, Req , Res} from '@nestjs/common';
import { AppService } from './app.service.js';
import type { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
// path parameter example: http://localhost:3000/hello/nasma
  @Post('hello/:name')
  postHello(@Param('name') name: string) {
    return `Hello ${name}, this is a POST request!`;
    
  }
// body parameter example: http://localhost:3000/hello?name=nasma
@Post('hello')
  postHello2(@Body() body: string ) {
    return body;

  }

@Post('welcome')
 welcome(@Body('name') name : string){
  return this.appService.postHello(name)

 }
 //  request and response
// traditional request and response example
 @Post('/register')
 register(@Body('name') name: string, @Req() req: Request, @Res() res: Response){
   res.send(req.body);
 }

}