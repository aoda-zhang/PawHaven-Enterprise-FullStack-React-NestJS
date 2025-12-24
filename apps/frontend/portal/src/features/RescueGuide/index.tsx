import { Container, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { StepCard } from './components/StepCard';

export const RescueGuide = () => {
  const { t } = useTranslation();
  const stepsContent = t('rescueGuide.steps', {
    returnObjects: true,
  }) as Array<{
    icon: string;
    title: string;
    desc: string;
  }>;
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h3" gutterBottom fontWeight="bold">
        {t('rescueGuide.title')}
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {t('rescueGuide.intro')}
      </Typography>

      <Box>
        {stepsContent?.map((step) => (
          <StepCard key={step?.title} {...step} />
        ))}
      </Box>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 5, textAlign: 'center', fontStyle: 'italic' }}
      >
        {t('rescueGuide.quote')}
      </Typography>
    </Container>
  );
};
