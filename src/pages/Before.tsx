import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { change } from '../redux/slice/emotionSlice';
import weekmotion from '../assets/images/weekmotion.svg';
import {
  btnYellow,
  chipsBlue,
  chipsBlueBorder,
  chipsPink,
  chipsPinkBorder,
  chipsYellow,
  chipsYellowBorder
} from '../assets/customCSS/designSystem';
import axios from 'axios';
import { BASE_URL } from '../redux/function/url';
import { tag } from '../redux/types';

export default function Before() {
  const [emotion, setEmotion] = useState<tag[]>([]);
  const [checkedEmotion, setCheckedEmotion] = useState<any[]>([]);
  const dispatch = useDispatch();

  const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const { innerText } = event.target as HTMLDivElement;
    if (
      !checkedEmotion.includes(
        emotion.find((item: tag) => item.tagName === innerText)
      ) &&
      checkedEmotion.length < 3
    ) {
      setCheckedEmotion([
        ...checkedEmotion,
        emotion.find((item: tag) => item.tagName === innerText)
      ]);
    } else {
      setCheckedEmotion(
        checkedEmotion.filter((item: tag) => item.tagName !== innerText)
      );
    }
  };

  const requestEmotion = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/tag`);
      setEmotion(response.data.data);
    } catch (error) {
      throw new Error('Error!');
    }
  };

  useEffect(() => {
    requestEmotion();
  }, []);

  return (
    <section className="bg-mono-100 h-screen flex flex-col items-center">
      <div className="py-4">
        <img src={weekmotion} alt="main_logo" />
      </div>
      <article className="w-4/5">
        <h1 className="text-2xl text-mono-700 font-bold">
          오늘의 감정을 선택하세요.
        </h1>
        <div className="flex my-4 gap-2">
          {emotion
            .filter((data) => data.tagCategory.seq === '1')
            .map((item: tag, index: number) => (
              <div
                key={index}
                className={
                  checkedEmotion.includes(item) ? chipsPink : chipsPinkBorder
                }
                onClick={onClick}
              >
                {item.tagName}
              </div>
            ))}
        </div>
        <div className="flex my-4 gap-2">
          {emotion
            .filter((data: tag) => data.tagCategory.seq === '2')
            .map((item: tag, index: number) => (
              <div
                key={index}
                className={
                  checkedEmotion.includes(item) ? chipsBlue : chipsBlueBorder
                }
                onClick={onClick}
              >
                {item.tagName}
              </div>
            ))}
        </div>
        <div className="flex my-4 gap-2">
          {emotion
            .filter((data: tag) => data.tagCategory.seq === '3')
            .map((item: tag, index: number) => (
              <div
                key={index}
                className={
                  checkedEmotion.includes(item)
                    ? chipsYellow
                    : chipsYellowBorder
                }
                onClick={onClick}
              >
                {item.tagName}
              </div>
            ))}
        </div>
        <Link to={'/diary'} onClick={() => dispatch(change(checkedEmotion))}>
          <button className={btnYellow}>일기 쓰러가기</button>
        </Link>
      </article>
    </section>
  );
}
