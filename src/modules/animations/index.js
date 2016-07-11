import homepage from './homepage';
import nothing from './nothing';

export default function(animate , DOM){

  return {
    homepage:homepage(animate ,DOM),
    nothing:nothing(animate ,DOM)
  }
}
