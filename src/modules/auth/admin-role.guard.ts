import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { Observable } from 'rxjs';
import { UserRole } from '../role/enum/role.enum';
import { UserService } from '../user/user.service';

@Injectable()
export class AdminRoleGuard implements CanActivate {
  constructor(private userService: UserService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    if (request?.user) {
      const { userId } = request.user;
     
      const user = await this.userService.getUserById(userId);
      delete user.password;
    
      return user.roleId === UserRole.ADMIN;
    }

    return false;
  }
}
