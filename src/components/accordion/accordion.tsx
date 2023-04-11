import React, { useRef, useState, ReactNode } from 'react';
import classes from './accordion.module.scss';

const IS_OPEN_DEFAULT = false;
const HEIGHT_DEFAULT = 0;
export enum Types {
  STYLED = 'styled',
}

interface IAccordionProps {
  className: string;
  title: string;
  children: ReactNode;
  type?: Types.STYLED;
}

const Accordion: React.FC<IAccordionProps> = ({ className, title, type, children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(IS_OPEN_DEFAULT);
  const [height, setHeight] = useState<number | string>(HEIGHT_DEFAULT);

  const contentRef = useRef<HTMLDivElement>(null);
  const wrapperHeight = contentRef?.current?.offsetHeight;

  const onAccordionTitleClick = () => {
    if (isOpen) {
      typeof wrapperHeight === 'number' && setHeight(wrapperHeight);
      setTimeout(() => setHeight(0), 10);
    } else {
      typeof wrapperHeight === 'number' && setHeight(wrapperHeight);
      setTimeout(() => setHeight('auto'), 300);
    }

    setIsOpen(!isOpen);
  };

  const visibilityClassName = isOpen ? '' : ` ${classes.isHidden}`;

  const accordionClassNames = [classes.accordion];
  className && accordionClassNames.push(className);

  const titleClassName =
    type === Types.STYLED ? classes.accordionTitleStyled : classes.accordionTitle;

  return (
    <div className={accordionClassNames.join(' ')}>
      <div className={`${titleClassName}${visibilityClassName}`} onClick={onAccordionTitleClick}>
        {title}
      </div>

      <div className={classes.accordionContentWrapper} style={{ height }}>
        <div className={classes.accordionContent} ref={contentRef}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
