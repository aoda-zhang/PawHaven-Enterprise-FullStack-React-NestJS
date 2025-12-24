import type { FC, ReactNode } from 'react';

interface SectionType {
  label: string | ReactNode;
  value: string | ReactNode;
}

interface Props {
  title?: string | ReactNode;
  sections: SectionType[];
}

export const Phase: FC<Props> = (props) => {
  const { title, sections } = props;
  return (
    <div className="border-b border-border pb-5 mb-3">
      {title && <p className="text-2xl font-bold">{title}</p>}
      {sections?.map((section, idx) => (
        <p
          // eslint-disable-next-line react/no-array-index-key
          key={idx}
          className="flex flex-row items-center justify-between mt-4 text-lg"
        >
          <span className="text-gray-500">{section.label}</span>
          <span> {section.value}</span>
        </p>
      ))}
    </div>
  );
};
