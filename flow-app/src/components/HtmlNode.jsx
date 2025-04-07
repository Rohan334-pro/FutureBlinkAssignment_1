// components/HtmlNode.js
import { faUserPlus, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const iconMap = {
    faEnvelope: faEnvelope,
    faUserPlus: faUserPlus,
};
export default function HtmlNode({ data }) {
    const hasData = data.labelHtml.indexOf('###') !== -1;
    const color = hasData ? 'bg-' + data.labelHtml.split('###')[1] : 'bg-pink';
    const iconKey = hasData ? data.labelHtml.split('###')[0] : 'faUserPlus';
    const icon = iconMap[iconKey] || faUserPlus;
    const htmlCode = hasData ? data.labelHtml.split('###')[2] : data.labelHtml;
    return (
        <div className="html-node bg-white rounded-xl p-4 shadow-lg border border-gray-300 w-60">
            <div className='flex'>
                <div className={`icon-wrapper ${color}`}>
                    <FontAwesomeIcon icon={icon} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: htmlCode }} />
            </div>
        </div>
    );
}
