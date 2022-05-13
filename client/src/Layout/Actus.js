import React, { useEffect } from 'react';

import Cardpost from '../Components/Posts/Cardpost';
import Newpost from '../Components/Posts/Newpost';

export default function Actus() {
  return (
    <div className="news-container">
      <Newpost />
      <Cardpost />
    </div>
  );
}
