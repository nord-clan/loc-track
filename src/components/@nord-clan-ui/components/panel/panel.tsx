import type { FC, PropsWithChildren } from 'react';
import type { BasePanelStore } from './panel.store';
import { observer } from 'mobx-react-lite';
import { PanelStyled } from './panel.style';

interface IPanelProps extends PropsWithChildren {
  store: BasePanelStore;
}

export const Panel: FC<IPanelProps> = observer((props) => {
  const { children, store } = props;
  const { state, side } = store;

  const { isVisible } = state;

  return (
    <PanelStyled isVisible={isVisible} side={side}>
      <section>{children}</section>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path d="M0,64L24,69.3C48,75,96,85,144,74.7C192,64,240,32,288,48C336,64,384,128,432,170.7C480,213,528,235,576,240C624,245,672,235,720,192C768,149,816,75,864,58.7C912,43,960,85,1008,90.7C1056,96,1104,64,1152,74.7C1200,85,1248,139,1296,138.7C1344,139,1392,85,1416,58.7L1440,32L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path d="M0,64L24,69.3C48,75,96,85,144,74.7C192,64,240,32,288,48C336,64,384,128,432,170.7C480,213,528,235,576,240C624,245,672,235,720,192C768,149,816,75,864,58.7C912,43,960,85,1008,90.7C1056,96,1104,64,1152,74.7C1200,85,1248,139,1296,138.7C1344,139,1392,85,1416,58.7L1440,32L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z" />
        </svg>
      </div>
    </PanelStyled>
  );
});
