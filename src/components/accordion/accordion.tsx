import React, { useRef, useState, ReactElement } from 'react';
import classes from './accordion.module.scss';

const IS_OPEN_DEFAULT = false;
const HEIGHT_DEFAULT = 0;

interface IAccordionProps {
  className: string;
  title: string;
  children: ReactElement;
}

const Accordion: React.FC<IAccordionProps> = ({ className, title, children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(IS_OPEN_DEFAULT);
  const [height, setHeight] = useState<number>(HEIGHT_DEFAULT);
  const contentRef = useRef<HTMLDivElement>(null);

  const onAccordionTitleClick = () => {
    const wrapperHeight = isOpen ? 0 : contentRef?.current?.offsetHeight;

    wrapperHeight && setHeight(wrapperHeight);
    setIsOpen(!isOpen);
  };

  const visibilityClassName = isOpen ? '' : ` ${classes.isHidden}`;

  const accordionClassNames = [classes.accordion];
  className && accordionClassNames.push(className);

  return (
    <div className={accordionClassNames.join(' ')}>
      <div
        className={`${classes.accordionTitle}${visibilityClassName}`}
        onClick={onAccordionTitleClick}>
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
