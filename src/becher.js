export const becher = {
	name: 'becher',
	properties: {
		// =~= Theme Properties =~=
		'--theme-font-family-base': `'Montserrat', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		'--theme-font-family-heading': `'Libre Baskerville', ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif`,
		'--theme-font-color-base': 'var(--color-primary-500)',
		'--theme-font-color-dark': 'var(--color-secondary-500)',
		'--theme-rounded-base': '9999px',
		'--theme-rounded-container': '8px',
		'--theme-border-base': '1px',
		// =~= Theme On-X Colors =~=
		'--on-primary': 'var(--color-secondary-500)',
		'--on-secondary': 'var(--color-primary-500)',
		'--on-tertiary': 'var(--color-secondary-500)',
		'--on-success': '0 0 0',
		'--on-warning': '0 0 0',
		'--on-error': 'var(--color-secondary-500)',
		'--on-surface': 'var(--color-primary-500)',
		// =~= Theme Colors  =~=
		// primary | #333333
		'--color-primary-50': '224 224 224', // #e0e0e0
		'--color-primary-100': '214 214 214', // #d6d6d6
		'--color-primary-200': '204 204 204', // #cccccc
		'--color-primary-300': '173 173 173', // #adadad
		'--color-primary-400': '112 112 112', // #707070
		'--color-primary-500': '51 51 51', // #333333
		'--color-primary-600': '46 46 46', // #2e2e2e
		'--color-primary-700': '38 38 38', // #262626
		'--color-primary-800': '31 31 31', // #1f1f1f
		'--color-primary-900': '25 25 25', // #191919
		// secondary | #F7F8DC
		'--color-secondary-50': '254 254 250', // #fefefa
		'--color-secondary-100': '253 254 248', // #fdfef8
		'--color-secondary-200': '253 253 246', // #fdfdf6
		'--color-secondary-300': '252 252 241', // #fcfcf1
		'--color-secondary-400': '249 250 231', // #f9fae7
		'--color-secondary-500': '247 248 220', // #F7F8DC
		'--color-secondary-600': '222 223 198', // #dedfc6
		'--color-secondary-700': '185 186 165', // #b9baa5
		'--color-secondary-800': '148 149 132', // #949584
		'--color-secondary-900': '121 122 108', // #797a6c
		// tertiary | #800020
		'--color-tertiary-50': '236 217 222', // #ecd9de
		'--color-tertiary-100': '230 204 210', // #e6ccd2
		'--color-tertiary-200': '223 191 199', // #dfbfc7
		'--color-tertiary-300': '204 153 166', // #cc99a6
		'--color-tertiary-400': '166 77 99', // #a64d63
		'--color-tertiary-500': '128 0 32', // #800020
		'--color-tertiary-600': '115 0 29', // #73001d
		'--color-tertiary-700': '96 0 24', // #600018
		'--color-tertiary-800': '77 0 19', // #4d0013
		'--color-tertiary-900': '63 0 16', // #3f0010
		// success | #84cc16
		'--color-success-50': '237 247 220', // #edf7dc
		'--color-success-100': '230 245 208', // #e6f5d0
		'--color-success-200': '224 242 197', // #e0f2c5
		'--color-success-300': '206 235 162', // #ceeba2
		'--color-success-400': '169 219 92', // #a9db5c
		'--color-success-500': '132 204 22', // #84cc16
		'--color-success-600': '119 184 20', // #77b814
		'--color-success-700': '99 153 17', // #639911
		'--color-success-800': '79 122 13', // #4f7a0d
		'--color-success-900': '65 100 11', // #41640b
		// warning | #EAB308
		'--color-warning-50': '252 244 218', // #fcf4da
		'--color-warning-100': '251 240 206', // #fbf0ce
		'--color-warning-200': '250 236 193', // #faecc1
		'--color-warning-300': '247 225 156', // #f7e19c
		'--color-warning-400': '240 202 82', // #f0ca52
		'--color-warning-500': '234 179 8', // #EAB308
		'--color-warning-600': '211 161 7', // #d3a107
		'--color-warning-700': '176 134 6', // #b08606
		'--color-warning-800': '140 107 5', // #8c6b05
		'--color-warning-900': '115 88 4', // #735804
		// error | #D41976
		'--color-error-50': '249 221 234', // #f9ddea
		'--color-error-100': '246 209 228', // #f6d1e4
		'--color-error-200': '244 198 221', // #f4c6dd
		'--color-error-300': '238 163 200', // #eea3c8
		'--color-error-400': '225 94 159', // #e15e9f
		'--color-error-500': '212 25 118', // #D41976
		'--color-error-600': '191 23 106', // #bf176a
		'--color-error-700': '159 19 89', // #9f1359
		'--color-error-800': '127 15 71', // #7f0f47
		'--color-error-900': '104 12 58', // #680c3a
		// surface | #CCCCCC
		'--color-surface-50': '247 247 247', // #f7f7f7
		'--color-surface-100': '245 245 245', // #f5f5f5
		'--color-surface-200': '242 242 242', // #f2f2f2
		'--color-surface-300': '235 235 235', // #ebebeb
		'--color-surface-400': '219 219 219', // #dbdbdb
		'--color-surface-500': '204 204 204', // #CCCCCC
		'--color-surface-600': '184 184 184', // #b8b8b8
		'--color-surface-700': '153 153 153', // #999999
		'--color-surface-800': '122 122 122', // #7a7a7a
		'--color-surface-900': '100 100 100' // #646464
	}
};
