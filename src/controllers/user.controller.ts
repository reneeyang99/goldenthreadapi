import { repository } from '@loopback/repository';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../models/user';
import {
  HttpErrors,
  get,
  param,
} from '@loopback/rest';

export class UserController {
  constructor(
    @repository(UserRepository) protected userRepo: UserRepository,
  ) {}

  @get('/users')
  async findUsers(): Promise<User[]> {
    return await this.userRepo.find();
  }

  @get('/users/{id}')
  async findUsersById(@param.path.number('id') id: number): Promise<User> {
    
    let userExists: boolean = !!(await this.userRepo.count({ id }));

    if (!userExists) {
      throw new HttpErrors.BadRequest(`user ID ${id} does not exist`);
    }

    return await this.userRepo.findById(id);
  }

  // @get('/user/{id}/donations')
  // async getDonationsByUserId(
  //   @param.path.number('id') userId: number,
  //   @param.query.date('datefrom') dateFrom: Date,
  //   @param.query.number('donation') donation: number

  // ) {
  //   return {
  //     userId,
  //     dateFrom,
  //     donation
  //   }

  // }
}