export interface UserDto {
  id: number;
  fullName: string;
  username: string;
  avatar: string;
  role: 'ADMIN' | 'USER';
}