import { extend } from 'vee-validate';
import { required, max, min } from 'vee-validate/dist/rules';

extend('required', {
  ...required,
});
extend('min', {
  ...min,
});
extend('max', {
  ...max,
});
