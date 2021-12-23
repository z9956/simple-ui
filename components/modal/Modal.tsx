import {
	ReactNode,
	HTMLAttributes,
	MouseEvent,
	FC,
	useState,
	useEffect,
	useRef,
} from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { cx } from '@emotion/css';

import { TIMEOUT } from '../utils/constant';
import { Button } from '../index';
import { getTextareaStyles } from './style';
import usePortal from '../utils/usePortal';
import '../styles/transition';

export interface BaseModalProps {
	visible?: boolean;
	defaultVisible?: boolean;
	title: string;
	className?: string;
	cancelText?: string;
	okText?: string;
	onCancel?: () => void;
	onOk?: () => void;
	keyboard?: boolean;
	children?: ReactNode;
}

type NativeAttrs = Omit<HTMLAttributes<any>, keyof BaseModalProps>;

export type ModalProps = BaseModalProps & NativeAttrs;

const Modal: FC<ModalProps> = (props) => {
	const {
		visible: propVisible,
		keyboard = true,
		defaultVisible,
		cancelText = '取消',
		okText = '确定',
		onCancel,
		onOk,
		title,
		className,
		children,
	} = props;

	const el = usePortal('modal');
	const modalRef = useRef<HTMLDivElement>(null);

	// keyboard

	const [visible, setVisible] = useState(defaultVisible);

	const handleClose = () => {
		setVisible(false);
		onCancel?.();
	};

	const handleOk = () => {
		setVisible(true);
		onOk?.();
	};

	const parentHandle = (e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		e.preventDefault();
	};

	useEffect(() => {
		if (propVisible !== undefined) {
			setVisible(propVisible);
		}
	}, [propVisible]);

	useEffect(() => {
		if (keyboard) {
			const handle = (e: Event & { key?: string }) => {
				if (e.type === 'keydown' && e.key === 'Escape') {
					handleClose();
				}
			};

			document.addEventListener('keydown', handle);

			return () => {
				document.removeEventListener('keydown', handle);
			};
		}
	}, [keyboard]);

	if (!el) return null;
	const styles = getTextareaStyles();

	return createPortal(
		<CSSTransition in={visible} timeout={TIMEOUT} classNames={'my-node'}>
			<div
				ref={modalRef}
				className={cx(styles.wrap, !visible && styles.visible, className)}
				onClick={handleClose}
			>
				<div className="modal-mask" />
				<div className={'modal'} onClick={parentHandle}>
					<div className="modal-header">
						<h4>{title}</h4>
						<span className="modal-close" onClick={handleClose}>
							<AiOutlineClose />
						</span>
					</div>
					<div className="modal-body">{children}</div>
					<div className={'modal-footer'}>
						<Button className={'modal-cancel'} onClick={handleClose}>
							{cancelText}
						</Button>
						<Button
							className={'modal-confirm'}
							onClick={handleOk}
							variant={'primary'}
						>
							{okText}
						</Button>
					</div>
				</div>
			</div>
		</CSSTransition>,
		el,
	);
};

Modal.displayName = 'Modal';

export default Modal;
