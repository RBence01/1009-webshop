import { orderDTO } from './app.controller.dto';
import { Injectable } from '@nestjs/common';
import { statSync, appendFileSync } from 'fs';

@Injectable()
export class AppService {
  async add(order: orderDTO) {
    console.log("order added");
    if (statSync('./orders.csv').size === 0) appendFileSync('./orders.csv', `${order.name};${order.accountNumber}`);
    else  appendFileSync('./orders.csv', `\n${order.name};${order.accountNumber}`);
  }
}
