import catchErrors from '~/core/catchErrors';

import env from '~/core/env';

export const checkStatus = catchErrors((_req, res) => {
  const missingEnvVars: string[] = [];

  Object.keys(env).forEach((k) => {
    /* eslint-disable-next-line */
    // @ts-ignore
    if (!env[k]) missingEnvVars.push(k);
  });

  res.status(200).json({
    status: 'Alive and kicking',
    missingVariables: missingEnvVars
  });
});

export default checkStatus;
