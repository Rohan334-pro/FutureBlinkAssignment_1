import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const timeOptions = [
    '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM',
    '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM'
];
const timezones = ['Asia/Calcutta', 'UTC', 'America/New_York', 'Europe/London'];

const TimeSelect = ({ value, onChange }) => (
    <select value={value} onChange={onChange} className="time-select">
        {timeOptions.map(time => (
            <option key={time} value={time}>{time}</option>
        ))}
    </select>
);

const DayRow = ({ day, config, onChange }) => {
    const handleFieldChange = (field, value) => {
        onChange(day, { ...config, [field]: value });
    };

    return (
        <tr>
            <td><input type="checkbox" checked={config.enabled} onChange={e => handleFieldChange('enabled', e.target.checked)} /></td>
            <td>{day}</td>
            <td><TimeSelect value={config.from} onChange={e => handleFieldChange('from', e.target.value)} /></td>
            <td><TimeSelect value={config.till} onChange={e => handleFieldChange('till', e.target.value)} /></td>
            <td><input type="text" value="24 - 48" disabled className="disabled-input" /></td>
        </tr>
    );
};

export default function EmailSchedulerForm() {
    const [launchDate, setLaunchDate] = useState(new Date());
    const [launchTime, setLaunchTime] = useState('12:45 PM');
    const [timezone, setTimezone] = useState('Asia/Calcutta');
    const [randomDelayEnabled, setRandomDelayEnabled] = useState(true);
    const [delayFrom, setDelayFrom] = useState(10);
    const [delayTo, setDelayTo] = useState(20);
    const [dayConfigs, setDayConfigs] = useState(
        weekdays.reduce((acc, day) => {
            acc[day] = { enabled: true, from: '09:00 AM', till: '05:00 PM' };
            return acc;
        }, {})
    );

    const handleDayChange = (day, newConfig) => {
        setDayConfigs(prev => ({ ...prev, [day]: newConfig }));
    };

    return (
        <div className="form-container">
            <form>
                <div className="row launch-row">
                    <div className="launch-field col-flex ">
                        <div><label>Launch on - Date</label></div>
                        <div className='input-date-picker'>
                            <DatePicker selected={launchDate} onChange={setLaunchDate} className="date-picker" />
                            <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
                            <FontAwesomeIcon icon={faTimes} className="icon" />
                        </div>
                    </div>
                    <div className="launch-field col-flex">
                        <div><label>Time</label></div>
                        <TimeSelect value={launchTime} onChange={e => setLaunchTime(e.target.value)} />
                    </div>
                    <div className="launch-field col-flex">
                        <div><label>Timezone</label></div>
                        <select value={timezone} onChange={e => setTimezone(e.target.value)}>
                            {timezones.map(tz => (
                                <option key={tz} value={tz}>{tz}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="random-delay">
                    <label className="checkbox-label">
                        <input type="checkbox" checked={randomDelayEnabled} onChange={e => setRandomDelayEnabled(e.target.checked)} />
                        Add Random Delays <FontAwesomeIcon icon={faInfoCircle} />
                    </label>
                    <div className="delay-range">
                        <input
                            type="number"
                            value={delayFrom}
                            onChange={e => setDelayFrom(e.target.value)}
                            placeholder="FROM (minutes)"
                        />
                        <input
                            type="number"
                            value={delayTo}
                            onChange={e => setDelayTo(e.target.value)}
                            placeholder="TO (minutes)"
                        />
                    </div>
                </div>

                <h4 className="section-header">Configure Sending Hours & Days <FontAwesomeIcon icon={faInfoCircle} /></h4>
                <table className="days-table">
                    <thead>
                        <tr>
                            <th>Enabled</th>
                            <th>Day</th>
                            <th>From</th>
                            <th>Till</th>
                            <th>Emails Sends / Day / Sender</th>
                        </tr>
                    </thead>
                    <tbody>
                        {weekdays.map(day => (
                            <DayRow key={day} day={day} config={dayConfigs[day]} onChange={handleDayChange} />
                        ))}
                    </tbody>
                </table>
                <div class="flex flex-end">
                    <button className='button' type='submit'>Submit</button>
                </div>
            </form>
        </div>
    );
}
