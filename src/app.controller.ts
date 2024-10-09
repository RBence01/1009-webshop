import { Body, Controller, Get, Post, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { orderDTO } from './app.controller.dto';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  index() {
    return {errors: [], values: {name: '', accountNumber: '', EULA: ''}};
  }

  @Post()
  indexPost(@Body() body : orderDTO = {name: '', accountNumber: '', EULA: ''}, @Res() res : Response) {
    const errors = [];
    if (!body.name || !body.accountNumber)
      errors.push('All  fields are required.');
    if (!/\S/.test(body.name))
      errors.push('Name must contain non space characters.')
    if (!/^\d{8}[-]\d{8}([-]\d{8})?$/.test(body.accountNumber))
      errors.push('Wrong bank account number format! (00000000-00000000(-00000000))');
    if (!body.EULA)
      errors.push('Accepting the EULA is required.')

    if (errors.length == 0) this.appService.add(body);
    res.render('index', {values: body, errors: errors});
  }
}
