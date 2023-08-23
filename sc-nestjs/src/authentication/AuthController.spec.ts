import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './AuthController';
import { AuthService } from './AuthService';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('login', () => {
    it('should return a JWT token on successful login', async () => {
      // Arrange
      const user = { username: 'admin', password: 'password' };
      const mockToken = 'mocked-jwt-token';
      authService.validateUser = jest.fn().mockResolvedValue(user);
      jwtService.sign = jest.fn().mockReturnValue(mockToken);

      // Act
      const result = await authController.login(user);

      // Assert
      expect(result).toEqual({ access_token: mockToken });
    });

    it('should throw an error on unsuccessful login', async () => {
      // Arrange
      const user = { username: 'admin', password: 'wrongpassword' };
      authService.validateUser = jest.fn().mockResolvedValue(null);

      // Act & Assert
      await expect(authController.login(user)).rejects.toThrow();
    });
  });
});
