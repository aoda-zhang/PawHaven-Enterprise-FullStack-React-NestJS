import { useTranslation } from 'react-i18next';

export const RecentStory = () => {
  const { t } = useTranslation();
  return (
    <div className="px-4 lg:px-20">
      <p className="text-base lg:text-2xl font-bold my-4">
        {t('common.love_story')}
      </p>
    </div>
  );
};
