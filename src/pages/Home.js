import { IonContent, IonFooter, IonGrid, IonHeader, IonPage, IonCard, 
	IonItem, IonIcon, IonLabel } from '@ionic/react';
import { wifi} from 'ionicons/icons';
import { useEffect, useState } from 'react';
import Button from '../components/Button';
import ButtonRow from '../components/ButtonRow';
import styles from "./Home.module.css";

import { buttons } from "../utils/Buttons";

const Home = () => {

	const [ sum, setSum ] = useState("0");
	const [ sumHistory, setSumHistory ] = useState("");

	const handleClick = (e, operator) => {

		const tempSumHistory = sumHistory.replace("Calculadora", "");

		if (operator === "=") {

			calculate();
		} else if (operator === "C") {

			reset();
		} else if (operator === "Del") {
			
			backspace();
		} else {
			
			setSumHistory(tempSumHistory + operator);
		}
	}

	useEffect(() => {

		calculate();
	}, [sumHistory]);

	const calculate = () => {

		try {
			setSum(eval(sumHistory).length > 5 ? eval(sumHistory).toFixed(4) : eval(sumHistory));
		} catch (e) {

		}
	}

	const reset = () => {
		setSumHistory("");
		setSum("0");		
	}

	const backspace = () => {
		const tempSum = sumHistory.substr(0, sumHistory.length -1);
		setSumHistory(tempSum);
	}

	return (
		<IonPage>
			<IonHeader>
			
			</IonHeader>
			<IonContent fullscreen>
			
			<IonCard className={ styles.sumContainer } >
          <IonItem href="#" className="ion-activated">
            <h1>Calculadora con Ionic - React</h1>
          </IonItem>
		  </IonCard>
		  
			<IonCard>
				<div className={ styles.sumContainer }>
					<p>{ sumHistory }</p>
					<h1>{ sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }</h1>
				</div>
				<IonGrid className="ion-text-center ion-justify-content-center" >

					{ buttons.map((buttonRow, index) => {

						return (
							<ButtonRow key={ index }>
								{ buttonRow.map(button => {

									return <Button key={ button.value } value={ button.value } special={ button.special } clickEvent={ handleClick } />;
								})}
							</ButtonRow>
						);
					})}
				</IonGrid>
				</IonCard>
			</IonContent>

			<IonFooter className={ styles.calculatorContainer }>
			</IonFooter>
		</IonPage>
	);
};

export default Home;
