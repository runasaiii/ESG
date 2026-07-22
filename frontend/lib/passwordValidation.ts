export interface PasswordValidationResult {
  isValid: boolean;
  progress: number;
  color: 'red' | 'yellow' | 'green';
  strength: 'weak' | 'medium' | 'strong';
  errors: string[];
}

const SPECIAL_CHARS_REGEX = /[!@#$%^&*()_+\-=\[\]{}|;:'",.<>?\/\\~`]/;
const COMMON_PATTERNS = [
  /(.)\1{2,}/i,
  /(012|123|234|345|456|567|678|789|890)/,
  /(qwerty|asdfgh|zxcvbn|password|123456)/i,
];

function getMissingRequirements(password: string): string[] {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Минимум 8 символов');
  }
  if (!/[A-ZА-ЯЁ]/.test(password)) {
    errors.push('Добавьте заглавную букву');
  }
  if (!/[a-zа-яё]/.test(password)) {
    errors.push('Добавьте строчную букву');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Добавьте цифру');
  }
  if (!SPECIAL_CHARS_REGEX.test(password)) {
    errors.push('Добавьте специальный символ (!@#$%^&*...)');
  }

  for (const pattern of COMMON_PATTERNS) {
    if (pattern.test(password)) {
      errors.push('Избегайте простых и повторяющихся паттернов');
      break;
    }
  }

  return errors;
}

export function validatePassword(password: string): PasswordValidationResult {
  const errors = getMissingRequirements(password);

  const hasUpper = /[A-ZА-ЯЁ]/.test(password) ? 1 : 0;
  const hasLower = /[a-zа-яё]/.test(password) ? 1 : 0;
  const hasNumber = /[0-9]/.test(password) ? 1 : 0;
  const hasSpecial = SPECIAL_CHARS_REGEX.test(password) ? 1 : 0;
  const hasMinLength = password.length >= 8 ? 1 : 0;
  const criticalCount = hasUpper + hasLower + hasNumber + hasSpecial + hasMinLength;

  let progress = Math.round((criticalCount / 5) * 100);
  let color: PasswordValidationResult['color'] = 'red';
  let strength: PasswordValidationResult['strength'] = 'weak';

  if (criticalCount >= 5 && errors.length === 0) {
    progress = 100;
    color = 'green';
    strength = 'strong';
  } else if (criticalCount >= 3) {
    progress = Math.max(progress, 60);
    color = 'yellow';
    strength = 'medium';
  } else {
    progress = Math.min(progress, 33);
    color = 'red';
    strength = 'weak';
  }

  return {
    isValid: errors.length === 0,
    progress,
    color,
    strength,
    errors,
  };
}

export function getPasswordStrengthColor(color: PasswordValidationResult['color']): string {
  switch (color) {
    case 'green':
      return '#22c55e';
    case 'yellow':
      return '#eab308';
    case 'red':
    default:
      return '#ef4444';
  }
}
