import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeartSVG from '../components/HeartSVG';

gsap.registerPlugin(ScrollTrigger);

type Attendance = 'yes' | 'no' | null;

const alcoholOptions = ['Буду Водочку', 'Вино', 'Пиво', 'Шампанское', 'Коньяк', 'Виски', 'Безалкогольное'];
const meatOptions = ['Хрюшка', 'Курочка', 'Барашка', 'Рыбка'];

export default function GuestForm() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [attendance, setAttendance] = useState<Attendance>(null);
  const [guestNames, setGuestNames] = useState('');
  const [alcohol, setAlcohol] = useState<string[]>([]);
  const [meat, setMeat] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // !!! ЭТО ВАША ССЫЛКА НА ФОРМУ (action) !!!
  // Скопирована из вашей предзаполненной ссылки, конец заменён на /formResponse
  const GOOGLE_FORM_ACTION_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfrwfwrP92xH0BIhrp2eaK0Uo45rZGHn7kKUYxC1Hmvr3rRFw/formResponse";

  useGSAP(() => {
    if (!sectionRef.current || !formRef.current) return;
    const fields = formRef.current.querySelectorAll('.form-field');
    gsap.from(fields, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none none',
      },
    });
  }, { scope: sectionRef });

  const toggleAlcohol = (option: string) => {
    setAlcohol((prev) =>
      prev.includes(option) ? prev.filter((a) => a !== option) : [...prev, option]
    );
  };

  const toggleMeat = (option: string) => {
    setMeat((prev) =>
      prev.includes(option) ? prev.filter((m) => m !== option) : [...prev, option]
    );
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!firstName.trim()) newErrors.firstName = 'Укажите имя';
    if (!lastName.trim()) newErrors.lastName = 'Укажите фамилию';
    if (!age.trim()) newErrors.age = 'Укажите возраст';
    else if (isNaN(Number(age)) || Number(age) < 1 || Number(age) > 120) {
      newErrors.age = 'Укажите корректный возраст';
    }
    if (!attendance) newErrors.attendance = 'Укажите, сможете ли присутствовать';
    return newErrors;
  };

  // Отправка данных через скрытую форму (без fetch, без CORS, без блокировок)
  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  setErrors({});
  setFormState('submitting');

  // Создаём форму
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = GOOGLE_FORM_ACTION_URL;
  form.target = iframeRef.current?.name || 'hiddenFrame';
  form.style.display = 'none';

  // Функция для добавления поля
  const addField = (name: string, value: string) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = value;
    form.appendChild(input);
  };

  // Одиночные поля
  addField('entry.507453910', firstName);
  addField('entry.1194910482', lastName);
  addField('entry.665774327', age);
  addField('entry.1303172971', attendance === 'yes' ? 'С удовольствием приду' : 'К сожалению, не смогу');
  addField('entry.65553590', guestNames);

  // Множественный выбор: алкоголь (каждый вариант отдельным полем с одним именем)
  alcohol.forEach(option => {
    addField('entry.809256960', option);
  });

  // Множественный выбор: мясо
  meat.forEach(option => {
    addField('entry.280025484', option);
  });

  // Отправляем
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);

  // Показываем успех
  setTimeout(() => {
    setFormState('success');
    if (successRef.current) {
      gsap.from(successRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        delay: 0.3,
        ease: 'power2.out',
      });
    }
  }, 1000);
};

  return (
    <section ref={sectionRef} id="form" className="section-padding bg-blush-bg">
      <div className="max-w-[600px] mx-auto gap-2">
        <img src="/images/heart.png" alt="Цветок-левый" className="w-16 h-16 object-cover" />
        <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] text-olive font-bold text-center mb-3">
          Анкета гостя
        </h2>
        <p className="text-xs text-[#1f2420] text-center font-light mb-4 leading-none text-center">
          Если вы придете семьей или парой, пожалуйста, заполните анкету <strong>индивидуально</strong> для
          каждого гостя.<br /> Нам хочется позаботиться о комфорте каждого из вас.
        </p>

        {formState === 'success' ? (
          <div ref={successRef} className="text-center py-12">
            <div className="flex justify-center mb-4">
              <HeartSVG className="w-10 h-10 animate-pulse-heart" />
            </div>
            <p className="font-display text-[1.3rem] text-olive font-light">
              Спасибо! Мы получили вашу анкету и с нетерпением ждём встречи!
            </p>
          </div>
        ) : (
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className={`space-y-6 transition-opacity duration-400 ${
              formState === 'submitting' ? 'opacity-50 pointer-events-none' : ''
            }`}
          >
            {/* Имя и Фамилия */}
            <div className="form-field grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[0.95rem] font-display font-bold text-olive mb-1">Имя</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Ваше имя"
                  className={`w-full bg-white border rounded-xl px-4 py-3 font-body text-dark font-light placeholder:text-[#a0a898] focus:outline-none focus:border-olive-light focus:shadow-[0_0_0_3px_rgba(175,194,138,0.2)] transition-all duration-200 ${
                    errors.firstName ? 'border-blush' : 'border-[#e0ddd5]'
                  }`}
                />
                {errors.firstName && <p className="text-blush text-[0.8rem] font-body font-light mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <label className="block text-[0.95rem] font-display font-bold text-olive mb-1">Фамилия</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Ваша фамилия"
                  className={`w-full bg-white border rounded-xl px-4 py-3 font-body text-dark font-light placeholder:text-[#a0a898] focus:outline-none focus:border-olive-light focus:shadow-[0_0_0_3px_rgba(175,194,138,0.2)] transition-all duration-200 ${
                    errors.lastName ? 'border-blush' : 'border-[#e0ddd5]'
                  }`}
                />
                {errors.lastName && <p className="text-blush text-[0.8rem] font-body font-light mt-1">{errors.lastName}</p>}
              </div>
            </div>

            {/* Возраст */}
            <div className="form-field">
              <label className="block text-[0.95rem] font-display font-bold text-olive mb-1">Возраст</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Ваш возраст"
                min={1}
                max={120}
                className={`w-full sm:w-1/2 bg-white border rounded-xl px-4 py-3 font-body text-dark font-light placeholder:text-[#a0a898] focus:outline-none focus:border-olive-light focus:shadow-[0_0_0_3px_rgba(175,194,138,0.2)] transition-all duration-200 ${
                  errors.age ? 'border-blush' : 'border-[#e0ddd5]'
                }`}
              />
              {errors.age && <p className="text-blush text-[0.8rem] font-body font-light mt-1">{errors.age}</p>}
            </div>

            {/* Присутствие */}
            <div className="form-field">
              <label className="block text-[0.95rem] font-display font-bold text-olive mb-3">Сможете ли присутствовать?</label>
              <div className="flex flex-col sm:flex-row gap-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div
                    className={`w-5 h-5 rounded-full border-2 border-olive-light flex items-center justify-center transition-colors duration-200 ${
                      attendance === 'yes' ? 'bg-blush border-blush' : 'bg-white group-hover:border-blush'
                    }`}
                    onClick={() => setAttendance('yes')}
                  >
                    {attendance === 'yes' && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                  <span className="font-body text-dark font-light">С удовольствием приду</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div
                    className={`w-5 h-5 rounded-full border-2 border-olive-light flex items-center justify-center transition-colors duration-200 ${
                      attendance === 'no' ? 'bg-blush border-blush' : 'bg-white group-hover:border-blush'
                    }`}
                    onClick={() => setAttendance('no')}
                  >
                    {attendance === 'no' && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                  <span className="font-body text-dark font-light">К сожалению, не смогу</span>
                </label>
              </div>
              {errors.attendance && <p className="text-blush text-[0.8rem] font-body font-light mt-1">{errors.attendance}</p>}
            </div>

            {/* Дополнительные поля (только если придет) */}
            {attendance === 'yes' && (
              <>
                <div className="form-field animate-in fade-in slide-in-from-top-2 duration-300">
                  <label className="block font-body text-[0.85rem] font-medium text-olive mb-1">
                    Если придёте с ребенком, укажите его имя:
                  </label>
                  <textarea
                    value={guestNames}
                    onChange={(e) => setGuestNames(e.target.value)}
                    placeholder="Имя ребенка/детей"
                    rows={3}
                    className="w-full bg-white border border-[#e0ddd5] rounded-xl px-4 py-3 font-body text-dark font-light placeholder:text-[#a0a898] focus:outline-none focus:border-olive-light focus:shadow-[0_0_0_3px_rgba(175,194,138,0.2)] transition-all duration-200 resize-none"
                  />
                </div>

                <div className="form-field">
                  <label className="block font-body text-[0.85rem] font-medium text-olive mb-3">Предпочитаемый алкоголь:</label>
                  <div className="flex flex-wrap gap-3">
                    {alcoholOptions.map((option) => (
                      <label key={option} className="flex items-center gap-2 cursor-pointer group">
                        <div
                          className={`w-5 h-5 rounded border-2 border-olive-light flex items-center justify-center transition-colors duration-200 ${
                            alcohol.includes(option) ? 'bg-blush border-blush' : 'bg-white group-hover:border-blush'
                          }`}
                          onClick={() => toggleAlcohol(option)}
                        >
                          {alcohol.includes(option) && (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                        <span className="font-body text-dark font-light text-[0.9rem]">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-field">
                  <label className="block font-body text-[0.85rem] font-medium text-olive mb-3">Предпочитаемое мясо:</label>
                  <div className="flex flex-wrap gap-3">
                    {meatOptions.map((option) => (
                      <label key={option} className="flex items-center gap-2 cursor-pointer group">
                        <div
                          className={`w-5 h-5 rounded border-2 border-olive-light flex items-center justify-center transition-colors duration-200 ${
                            meat.includes(option) ? 'bg-blush border-blush' : 'bg-white group-hover:border-blush'
                          }`}
                          onClick={() => toggleMeat(option)}
                        >
                          {meat.includes(option) && (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                        <span className="font-body text-dark font-light text-[0.9rem]">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div className="form-field flex justify-center pt-4">
              <button
                type="submit"
                className="w-full sm:w-auto bg-olive text-white px-12 py-4 rounded-full font-display font-bold text-[1.5rem] transition-all duration-300 hover:bg-[#6b8239] hover:scale-[1.02] active:scale-[0.98]"
                disabled={formState === 'submitting'}
              >
                {formState === 'submitting' ? 'Отправка...' : 'Отправить'}
              </button>
            </div>
          </form>
        )}
      </div>
      {/* Скрытый iframe для приёма ответа от Google (без отображения) */}
      <iframe
        ref={iframeRef}
        name="hiddenFrame"
        style={{ display: 'none' }}
        title="hiddenFrame"
      />
    </section>
  );
}